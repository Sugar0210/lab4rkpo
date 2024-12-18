import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DndPage() {
   const [columns, setColumns] = useState({
      todo: {
         name: 'Нужно сделать',
         items: [
            { id: "1", content: 'Почитать' },
            { id: '2', content: 'Поспать' },
            { id: '3', content: 'Покушать' },
         ],
      },
      inProgress: {
         name: 'В процессе',
         items: [],
      },
      done: {
         name: 'Готовы',
         items: [],
      },
      blocked: {
         name: 'Заблокированы',
         items: [],
      },
   });
   const onDragEnd = (result, columns, setColumns) => {
      const { source, destination } = result;
      if (!destination) return;
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
         sourceItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...sourceColumn,
               items: sourceItems,
            },
         });
      } else {
         destItems.splice(destination.index, 0, removed);
         setColumns({
            ...columns,
            [source.droppableId]: {
               ...sourceColumn,
               items: sourceItems,
            },
            [destination.droppableId]: {
               ...destColumn,
               items: destItems,
            },
         });
      }
   };

   const handleDelete = (columnId, itemId) => {
      const updatedColumn = {
         ...columns[columnId],
         items: columns[columnId].items.filter(item => item.id !== itemId),
      };

      setColumns({
         ...columns,
         [columnId]: updatedColumn,
      });
   };

   return (
      <div style={{
         display: 'flex', justifyContent: 'center',
         height: '100%'
      }}>
         <Link to="/lab4rkpo">Go to usual</Link>
         <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
            {Object.entries(columns).map(([columnId, column], index) => {
               return (
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '0 20px',
                     }}
                     key={columnId}
                  >
                     <h2>{column.name}</h2>
                     <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                           return (
                              <div
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                                 style={{
                                    background: snapshot.isDraggingOver ?
                                       'lightblue' : 'white',
                                    padding: 30,
                                    borderRadius: '20px',
                                    width: 250,
                                    minHeight: 500,
                                 }}
                              >
                                 {column.items.map((item, index) => (
                                    <Draggable
                                       key={item.id}
                                       draggableId={item.id}
                                       index={index}
                                    >
                                       {(provided, snapshot) => {
                                          return (
                                             <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                   userSelect: 'none',
                                                   padding: 16,
                                                   margin: '0 0 8px 0',
                                                   minHeight: '50px',
                                                   borderRadius: '20px',
                                                   display: 'flex',
                                                   alignItems: 'center',
                                                   justifyContent: 'space-between',
                                                   backgroundColor: snapshot.isDragging
                                                      ? '#c79fef'
                                                      : '#b9f7e8',
                                                   color: 'black',
                                                   ...provided.draggableProps.
                                                      style,
                                                }}
                                             >
                                                {item.content}
                                                <button
                                                   style={{
                                                      marginLeft: '10px',
                                                      backgroundColor: '#b9f7e8',
                                                      color: 'black',
                                                      border: 'none',
                                                      cursor: 'pointer',
                                                   }}
                                                   onClick={() => handleDelete(columnId, item.id)}>
                                                   X
                                                </button>
                                             </div>
                                          );
                                       }}
                                    </Draggable>
                                 ))}

                                 {provided.placeholder}

                              </div>
                           );
                        }}
                     </Droppable>
                  </div>
               );
            })}
         </DragDropContext >
      </div >
   );
}

export default DndPage;