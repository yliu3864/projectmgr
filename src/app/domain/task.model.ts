export interface Task{
    id?: string;
    desc?: string;
    completed: boolean;
    priority: number;
    dueDate?: Date;
    reminder?: Date;
    remark?: string;
    creatDate: Date;
    ownerId?: string;
    participantIds: string[];
    taskListId: string;
}