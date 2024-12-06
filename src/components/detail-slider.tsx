// "use client";

// export default function DetailSlider() {
//   return (
//     <section id="details_filter" className="mb-4 flex-grow">
//       <p className="mb-2 text-text dark:text-text-light">
//         Adjust the complexity level:
//       </p>
//       <label className="flex items-center gap-4 w-full">
//         <span className="text-sm whitespace-nowrap">High Level</span>
//         <input
//           type="range"
//           min="1"
//           max="3"
//           defaultValue="2"
//           onChange={(e) => {
//             document.documentElement.dataset.detail = e.target.value;
//           }}
//           className="h-2 bg-grey dark:bg-dimGrey rounded-lg appearance-none 
//               cursor-pointer accent-accent dark:accent-accent-light flex-grow"
//           list="ticks"
//         />
//         <datalist id="ticks">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </datalist>
//         <span className="text-sm whitespace-nowrap">Detailed</span>
//       </label>
//     </section>
//   );
// }


// detail-slider.tsx
"use client";

export default function DetailSlider() {
  return (
    <section id="details_filter" className="mb-4 flex-grow">
      <p className="mb-2 text-text dark:text-text-light">
        Adjust the complexity level:
      </p>
      <label className="flex items-center gap-4 w-full">
        <span className="text-sm whitespace-nowrap">High Level</span>
        <div className="relative flex-grow">
          <input
            type="range"
            min="1"
            max="3"
            defaultValue="2"
            onChange={(e) => {
              document.documentElement.dataset.detail = e.target.value;
            }}
            className="w-full slider-track"
            list="ticks"
          />
          <datalist id="ticks">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </datalist>
        </div>
        <span className="text-sm whitespace-nowrap">Detailed</span>
      </label>
    </section>
  );
}