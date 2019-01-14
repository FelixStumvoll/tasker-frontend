import { format } from 'date-fns';

const searchString = (regex, string, searchterm) => {
    return regex
        ? regex.test(string) || string.includes(searchterm)
        : string.includes(searchterm);
};

const searchTaskText = (regex, taskText, searchterm) => {
    let textReg = new RegExp('"text":(".*?")(?=,|})', 'g');

    let match = textReg.exec(taskText);

    while (match != null) {
        if (searchString(regex, match[1], searchterm)) return true;
        match = textReg.exec(taskText);
    }

    return false;
};

export default (task, searchterm) => {
    let taskEx;
    try {
        taskEx = new RegExp(`.*${searchterm}.*`);
    } catch (ex) {}

    if (task.title && searchString(taskEx, task.title, searchterm)) return true;

    if (
        task.tags.find(tag => {
            return searchString(taskEx, tag, searchterm);
        })
    ) {
        return true;
    }

    if (
        task.dueDate &&
        searchString(taskEx, format(task.dueDate, 'dd.MM.yyyy'), searchterm)
    )
        return true;

    if (
        task.text &&
        searchTaskText(taskEx, JSON.stringify(task.text), searchterm)
    )
        return true;

    return false;
};
