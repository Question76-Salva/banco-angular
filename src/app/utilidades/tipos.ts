export function esJSON(datos: string): boolean {
    try {
        // si no falla...
        // datos | posee formato JSON
        JSON.parse(datos);   
        return true;     
    } catch (error) {
        // si falla...
        // catch | se ejecuta cuando la variable 'datos'
        //      no posee formato JSON
        return false;
    }
}