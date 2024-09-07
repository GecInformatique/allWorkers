
// helpers.ts
export class FunctionHelpers {

  static forceReloadApp(){
    window.location.reload()
  }

  static checkingValues(value: any): boolean {
    // Check if the value is null or undefined
    if (value === null || value === undefined) {
      return false;
    }

    // Check if the value is an empty string
    if (typeof value === 'string' && value.trim() === '') {
      return false;
    }

    // Check if the value is an array and empty
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    // If the value is not null, undefined, or an empty string, return true
    return true;
  }
}

