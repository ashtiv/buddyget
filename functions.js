export function budgetColor(money) {
    if (money <= 0) {
        return 'white';
    }
    if (money > 0 && money < 50) {
        return 'green';
    }
    if (money >= 50 && money < 100) {
        return 'orange';
    }
    return 'red';
}

export function makeaverageDaily(total, month, year) {
    const today = new Date();
    if (month == today.getMonth() + 1 && year == today.getFullYear()) {
        return total / today.getDate();
    } else {
        return total / new Date(year, month, 0).getDate();
    }
}