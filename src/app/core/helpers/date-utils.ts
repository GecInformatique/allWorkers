
// helpers.ts
export class DateUtils {



  static calculateAge(dateToSend: string): number {
    // Convert birth date string to a Date object
    const birthDateObj: Date = this.parseStringDateBdToDate(dateToSend);

    // Get the current date
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds
    const timeDifference: number = currentDate.getTime() - birthDateObj.getTime();

    // Calculate the difference in years
    const ageInYears: number = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

    // Round the age to the nearest whole number
    return Math.floor(ageInYears);
  }


  static parseStringDateBdToDate(dateString: string): Date {
    // Parse the date string in the format 'dd/MM/yyyy'
    if (dateString.includes('/')) {
      const dateParts: string[] = dateString.split('/');
      const day: number = parseInt(dateParts[0], 10);
      const month: number = parseInt(dateParts[1], 10) - 1; // Month is zero-based
      const year: number = parseInt(dateParts[2], 10);
      // Return a new Date object
      return new Date(year, month, day);
    } else {
      return new Date(dateString);
    }
    
  }

  //////////////////////////////////////////////////////
  ///////////////PRINCIPE DES DATES
  //// la oracle retourner les dates sur format dd/MM/YYYY
  //// la oracle accepte strictement insertion des dates sur format MM/dd/YYYY
  //// angular ne comprend que les dates dans le format suite MM/dd/YYYY
  //// input de type date ne comprend que les dates  sur le format yyyy-MM-dd
  //// les input p-calendar ne comprend que les dates sur le MM/dd/YYYY

 
  //input angular ne comprenne que les data dans le format yyyy-MM-dd
  static reformatStringDateForCalendar(inputDate: string): string {
    const parts = inputDate.split(' ');
    const dateParts = parts[0].split('/');
    var formattedDate = "";
    const year = dateParts[2]
    const month = (dateParts[0]).length === 2 ? dateParts[0] : `0${dateParts[0]}`
    const day = (dateParts[1]).length === 2 ? dateParts[1] : `0${dateParts[1]}`
    //31/10/2023 --FAUX
    //12/03/2021 --VRAI

    if (+dateParts[0] > 12) {
      formattedDate = `${day}/${month}/${year}`;
    } else {
      formattedDate = `${month}/${day}/${year}`;
    }
    return formattedDate; // "MM/dd/YYYY"
  }
  
  static reformatDateForInputDate(inputDate: Date): string {
    let year = inputDate.getFullYear();
    let month = ('0' + (inputDate.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
    let day = ('0' + inputDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;// "yyyy-MM-dd"
    return formattedDate;
  }



  formatDateToDisplay(dateChoose: string): string {
    const date: Date = new Date(dateChoose); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`; 
  }


  // Fonction utilitaire pour convertir une chaîne HH:mm en objet Date
  static parseHeure(heure: string): Date {
    const [heures, minutes] = heure.split(':');
    return new Date(0, 0, 0, parseInt(heures), parseInt(minutes));
  }



  // formater la date de type Date en une string de date compatible cote server
  static formatDateToSubmission(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }
  
  //// formater la date string en une string de date compatible cote server
  //static formatStringToSubmissionDate(dateChoose: string): string {
  //  const date: Date = new Date(dateChoose);
  //  const day = String(date.getDate()).padStart(2, '0');
  //  const month = String(date.getMonth() + 1).padStart(2, '0');
  //  const year = String(date.getFullYear());
  //  return `${day}/${month}/${year}`;
  //}

 

}

