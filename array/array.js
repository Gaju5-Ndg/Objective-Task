function arrayChanges(original, updated) {
    let newElements = [];
    let removedElements = [];
  
    updated.forEach(element => {
      if (!original.includes(element)) {
        newElements.push(element);
      }
    });
  
    original.forEach(element => {
      if (!updated.includes(element)) {
        removedElements.push(element);
      }
    });
  
    return [newElements, removedElements];
  }
  
const original = [1, 2, 3, 4, 5];
const updated = [2, 3, 6, 7];
const [newElements, removedElements] = arrayChanges(original, updated);
console.log("New elements:", newElements);
console.log("Removed elements:", removedElements);