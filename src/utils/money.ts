export const formatMoney = (amount: number) => {
    return amount.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}