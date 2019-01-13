export default (lhs, rhs) => {
    if (!lhs.dueDate) {
        return 1;
    }

    if (!rhs.dueDate) {
        return -1;
    }

    return new Date(lhs.dueDate) - new Date(rhs.dueDate);
};
