import FlipMove from 'react-flip-move';

import { Container, InputSearch } from '@/ui';

import { KanbanStack } from './components/kanbanStack';
import { KanbanTask } from './components/kanbanTask';
import { useKanban } from './useKanban';
import { KANBAN_STACK_TYPES } from './constants';
import { KanbanTaskTypeEnum } from './types';

import styles from './kanban.module.scss';

/** Страница канбана */
export const KanbanPage = () => {
  const {
    search,
    tasks,
    shouldShowNewTask,
    handleEmptyTask,
    setSearch,
    handleDeleteTask,
    handleEditTask,
    handleDropTask,
    handleCreateTask,
  } = useKanban();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <InputSearch value={search} onValueChange={setSearch} placeholder='поиск...' />
        </div>

        <div className={styles.content}>
          {KANBAN_STACK_TYPES.map(({ type, title }) => (
            <KanbanStack
              key={type}
              title={title}
              type={type}
              onTaskDrop={handleDropTask}
              onCreateTask={handleEmptyTask}
              shouldShowCreateButton={!shouldShowNewTask && type === KanbanTaskTypeEnum.TODO}
            >
              {shouldShowNewTask && type === KanbanTaskTypeEnum.TODO && (
                <KanbanTask onSubmit={handleCreateTask} onClose={handleEmptyTask} />
              )}

              <FlipMove typeName={null}>
                {tasks?.[type].map((task) => (
                  <KanbanTask key={task.id} task={task} onDelete={handleDeleteTask} onSubmit={handleEditTask} />
                ))}
              </FlipMove>
            </KanbanStack>
          ))}
        </div>
      </Container>
    </div>
  );
};
