
export const AbbreviatedNumberParser = (str) => {
   
  
    const parseSegment = (segment) => {
        const lakhRegex = /(\d+)\s*L/;
        const croreRegex = /(\d+)\s*Cr/;
  
      let values = []; // Array to store parsed values for each segment
  
      segment.map((segmentItem) => {
        if (segmentItem.match(lakhRegex)) {
          values.push(parseInt(segmentItem.match(lakhRegex)[1]) * 100000);
        } else if (segmentItem.match(croreRegex)) {
          values.push(parseInt(segmentItem.match(croreRegex)[1]) * 10000000);
        }
      });
  
      return values; // Return array of parsed values for the segment
    };
  
    const parts = str.map((item) => {
      return item.split("-");
    });
    const parsedSegments = parts.map(parseSegment); // Array of arrays of parsed values
  
    // Flatten the array of arrays into a single array
    const result = parsedSegments.reduce((acc, curr) => acc.concat(curr), []);
  
    return result;
  };
  