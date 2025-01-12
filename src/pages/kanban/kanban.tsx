import { Container } from '@/ui/container';
import { InputSearch } from '@/ui/input/search';
import { KANBAN_STACK_TYPES } from '@/constants/kanban';
import { KanbanStack } from './components/kanbanStack';
import { KanbanTask } from './components/kanbanTask';
import { useKanban } from './useKanban';
import styles from './kanban.module.scss';

export const KanbanPage = () => {
  const { search, setSearch, tasks, onTaskDelete, onTaskTextEdit, onTaskDrop } = useKanban();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <InputSearch value={search} onValueChange={setSearch} placeholder='поиск...' />
        </div>
        <div className={styles.content}>
          {KANBAN_STACK_TYPES.map((stackType) => (
            <KanbanStack key={stackType.type} title={stackType.title} type={stackType.type} onTaskDrop={onTaskDrop}>
              {tasks?.[stackType.type].map((task) => (
                <KanbanTask key={task.id} task={task} onDelete={onTaskDelete} onSubmit={onTaskTextEdit} />
              ))}
            </KanbanStack>
          ))}
        </div>
      </Container>
    </div>
  );
};
