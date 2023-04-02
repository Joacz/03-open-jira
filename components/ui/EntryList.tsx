import { DragEvent, FC, useContext, useMemo, useState } from 'react';
import { List, Paper } from '@mui/material';
import { EntriesContext } from 'context/entries';
import { EntryStatus } from 'interfaces';
import { EntryCard } from './';
import { UIContext } from 'context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, changeStatus } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const [isOver, setIsOver] = useState(false);

  const entriesByStatus = useMemo(
    () => entries.filter((e) => e.status === status),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    changeStatus(id, status);
    endDragging();
    setIsOver(false);
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      onDragLeave={() => setIsOver(false)}
      onDragEnd={() => setIsOver(false)}
      className={isDragging ? styles.dragging : styles.noDragging}
    >
      <Paper
        sx={{
          backgroundColor: isOver
            ? '#ffffff11 !important'
            : '#00000011 !important',
          padding: '.2em .4em',
          height: 'calc(100vh - 250px)',
          overflow: 'auto',
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.3 : 1,
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
