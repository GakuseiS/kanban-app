import FlipMove from 'react-flip-move';
import { Container } from '@/ui/container';
import { InputSearch } from '@/ui/input/search';
import { KANBAN_STACK_TYPES } from '@/constants/kanban';
import { KanbanStack } from './components/kanbanStack';
import { KanbanTask } from './components/kanbanTask';
import { useKanban } from './useKanban';
import styles from './kanban.module.scss';

export const KanbanPage = () => {
  const { search, tasks, withNewTask, handleEmptyTask, setSearch, onTaskDelete, onTaskEdit, onTaskDrop, onTaskCreate } =
    useKanban();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <InputSearch value={search} onValueChange={setSearch} placeholder='поиск...' />
        </div>
        <div className={styles.content}>
          {KANBAN_STACK_TYPES.map((stackType) => (
            <KanbanStack
              key={stackType.type}
              title={stackType.title}
              type={stackType.type}
              onTaskDrop={onTaskDrop}
              onCreateTask={handleEmptyTask}
              withCreateButton={!withNewTask && stackType.type === 'todo'}
            >
              {withNewTask && stackType.type === 'todo' ? (
                <KanbanTask onSubmit={onTaskCreate} onClose={handleEmptyTask} />
              ) : null}
              <FlipMove typeName={null}>
                {tasks?.[stackType.type].map((task) => (
                  <KanbanTask key={task.id} task={task} onDelete={onTaskDelete} onSubmit={onTaskEdit} />
                ))}
              </FlipMove>
            </KanbanStack>
          ))}
        </div>
      </Container>
    </div>
  );
};
