export const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return dateObject.toLocaleString('es-MX', options)
}