export const USER_ID_KEY = 'user_id';
export const notifications = {
    added: 'Сотрудник успешно добавлен',
    removed: 'Сотрудник перенесен в архив',
    edited: 'Данные сотрудника изменены',
    error: {
        added: 'Ошибка при добавлении сотрудника',
        removed: 'Ошибка при удалении сотрудника',
        edited: 'Ошибка при редактировании сотрудника',
        some: 'Что-то пошло не так'
    },
    archive: {
        restore: 'Сотрудник восстановлен из архива',
        removed: 'Сотрудник удален из архива',
        clear: 'Все сотрудники из архива удалены'
    }
}
export type ModalAction = 'restore' | 'remove' | 'clear';