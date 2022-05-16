export const useDebounce = (
   func: any,
   wait: number = 500,
   immediate: boolean = false
) => {
   var timeout: NodeJS.Timeout | null = null;

   return (...args: any) => {
      var context = this;

      var later = () => {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout as NodeJS.Timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
   };
};
