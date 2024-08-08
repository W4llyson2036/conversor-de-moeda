export const formatDate = (date) => {
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };

    // Converter a data para UTC-3
    const utcMinus3Date = new Date(date.getTime());

    const formattedDate = utcMinus3Date.toLocaleDateString('pt-BR', optionsDate);

    // Obter a hora e os minutos em UTC-3
    const hours = String(utcMinus3Date.getHours()).padStart(2, '0');
    const minutes = String(utcMinus3Date.getMinutes()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes} UTC-3`;

    return `${formattedDate} | ${formattedTime}`;
};