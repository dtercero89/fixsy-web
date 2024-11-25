
export default function WrappedComponent({  children}: {children: React.ReactNode}){

    return (
        <div className="bg-[hsl(var(--muted)/.4)]">
                {children}
        </div>)
}