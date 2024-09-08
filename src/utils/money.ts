export const formatMoney = (amount: number) => {
    return amount.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}

export const formatMoneyString = (valor: string) => {
    valor = valor.replace(/[^\d]/g, '');

    if (valor !== '') {
        const valorFormateado = parseInt(valor).toLocaleString('es-CL');

        return `$${valorFormateado}`;
    } else {
        return '';
    }
}