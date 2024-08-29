export const formatDateString = (dateString: string | null): string => {
    if (!dateString) return 'undefined'; // Falls kein Datum vorhanden ist, gib 'undefined' zurück
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };
  
export  const formatDateToString = (dateString: string | null): string => {
    if (!dateString) return 'undefined'; // Falls kein Datum vorhanden ist, gib 'undefined' zurück
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  };