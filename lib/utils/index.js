import { isArray, isString } from 'lodash';

export class utils {
  static showWait = () => {
    const id = document.getElementById('spinner-love');
    id.className = 'container-love love-show';
  };

  static hiddenWait = () => {
    const id = document.getElementById('spinner-love');
    if (id) {
      id.className = 'container-love love-hide';
    }
  };

  static FormatDate = (value) => {
    let date = null;

    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter((d) => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    return date
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      : '';
  };

  static formatDateTimeISO(value){
    
      if(value){
        const localeDate = new Date(value);
        localeDate.setHours(localeDate.getHours() + 6);
        return localeDate;
      }
      return value;
  }

  static formatDateTimeISODate(value){
    
    if(value){
      value.setHours(value.getHours() - 6);
      const formattedDate = value.toISOString();
      return formattedDate;
    }
    return value;
}

  static addDays = (date, days) => {
    const integerNumber = parseInt(days);
    const result = new Date(date);
    result.setDate(result.getDate() + integerNumber);
    return result;
  };

  static addMonths = (date, months) => {
    const integerNumber = parseInt(months);
    const result = new Date(date);
    result.setMonth(result.getMonth() + integerNumber);
    return result;
  };

  static FormatDateTime = (value) => {
    let date = null;

    if (!value) {
      return value;
    }

    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter((d) => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    return date
    ? `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : '';
      
  };

  static getDayOfMonth(date) {
    return date.getDate();
  }

  static getYear(date) {
    return date.getFullYear();
  }

  static getMonthNameInSpanish(date) {
    const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
    return formatter.format(date);
  }

  static formatAMPM(value) {
    if (!value) return value;

    let date = null;
    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter((d) => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debería ser '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  static getCurrentLocation = () => {
    let location = null;
    const onSucccess = (position) => {
      location = position;
    };

    const onError = () => {
      location = null;
    };

    if (!!navigator.geolocation) {
      var config = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      };

      navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
    }

    if (!location) {
      return null;
    }

    return location;
  };

  static descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  static getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => utils.descendingComparator(a, b, orderBy)
      : (a, b) => -utils.descendingComparator(a, b, orderBy);
  };

  static stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  static copyOf = (items) => {
    if (items === undefined || items === null) {
      return {};
    }

    const copy = JSON.parse(JSON.stringify(items));

    return copy;
  };

  static objectIsNotNull = (obj) => {
    if (Array.isArray(obj)) {
      return false;
    }

    const result = !!(obj && Object.keys(obj).length);

    return result;
  };

  static arrayHasItems = (array) => {
    if (!array || !isArray(array)) {
      return false;
    }

    const result = !!(array && array.length);
    return result;
  };

  static encodeFilePath = (filePath) => {
    return encodeURIComponent(filePath.replace(/\\/g, '/'));
  };

  static decodeFilePath = (encodedFilePath) => {
    return decodeURIComponent(encodedFilePath).replace(/\//g, '\\');
  };

  static hasErrorResponse = (response) => {
    const fieldErrors = [
      'exceptionMessage',
      'erroresValidacion',
      'validationErrorMessage',
      'mensajeValidacion',
      'mensajeError',
      'message'
    ];

    if (!response) {
      return false;
    }

    const hasErrors = fieldErrors.some((field) => {
      if (typeof response[field] === 'object') {
        const isError = utils.evaluateObject(response[field]);

        if (isError) return isError;
      }

      if (typeof response[field] === 'string') {
        if (response[field]) {
          return true;
        }
      }

      return false;
    });

    return hasErrors;
  };

  static getValueString = (prop, obj) => {
    if (utils.evaluateObject(obj)) {
      return obj[prop];
    }
    return '';
  };

  static getValueOrDefaultString = (prop) => {
    if (prop && !this.isNullOrEmpty(prop)) {
      return String(prop);
    }
    return '';
  };

  static getValueDate = (prop, obj) => {
    if (utils.evaluateObject(obj)) {
      const valueProp = obj[prop] ? new Date(obj[prop]) : null;

      return valueProp;
    }

    return null;
  };

  static isNullOrEmpty = (text) => {
    return (
      text === undefined ||
      text === null ||
      text === '' ||
      utils.isWhiteSpace(text)
    );
  };

  static isWhiteSpace = (str) => {
    return !str || /^\s*$/.test(str);
  };

  static materializeToFormData(sourceData) {
    if (this.evaluateObject(sourceData)) {
      const formValues = (FormData = { ...sourceData });
      return formValues;
    }
    return FormData;
  }
  static formatDateLong(value) {
    if (!value) {
      return value;
    }

    let date = null;
    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter((d) => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
  }

  static formatDayLong(value) {
    if (!value) {
      return value;
    }

    let date = null;
    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter((d) => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} de ${month}`;
  }

  static formatDateTimeLong(value) {
    const date = this.formatDateLong(value);
    const time = this.formatAMPM(value);
    return `${date} ${time}`;
  }

  static formatDecimal(value) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  static isResponseSucceeded(response) {
    if (!response) return false; // Verifica si 'response' es nulo o indefinido.
    
    const hasValidationError = this.isNullOrEmpty(response.validationErrorMessage);
    const hasError = this.isNullOrEmpty(response.error);

    return hasValidationError && hasError; // Devuelve verdadero solo si ambos están vacíos.
}
}
