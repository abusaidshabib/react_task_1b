import React from 'react';
import Cards from './Cards';
import { useDrag, useDrop } from 'react-dnd';

const DraggableCard = ({ data, index, moveCard }) => {
    const [, ref] = useDrag({
        type: "CARD",
        item: { index },
      });
    
      const [, drop] = useDrop({
        accept: "CARD",
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            moveCard(draggedItem.index, index);
            draggedItem.index = index;
          }
        },
      });
    return (
        <div ref={(node) => ref(drop(node))}>
      <Cards key={data.id} {...data} />
    </div>
    );
};

export default DraggableCard;