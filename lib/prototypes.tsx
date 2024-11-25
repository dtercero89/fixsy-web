interface Array<T> {
    sumByProp(propiedad: string): number;
}

Object.defineProperty(Array.prototype, 'sumByProp', {
    value: function(propiedad: string): number {
        return this.reduce((total: number, elemento: any) => total + elemento[propiedad], 0);
    },
    enumerable: false // Esto asegura que el método no será enumerado en las iteraciones de un bucle for...in
});