export function formatNumber(number:number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      // Convert to kilo (1k = 1000)
      return (number / 1000).toFixed(1) + 'k';
    } else if(number < 100000000) {
      // Convert to million (1M = 1000000)
      return (number / 1000000).toFixed(1) + 'M';
    }
    else {
        return (number / 100000000).toFixed(1) + 'b';
    }
  }