export const string = (v1: string, v2: string) => {

}


export const number = (v1: number, v2: number) => {
    if (v1 == null) {
        v1 = Number.MIN_VALUE;
    } else if (isNaN(v1)) {
        v1 = Number.MIN_VALUE; // 如果不是数字，视为最小值
    } else {
        v1 = Number(v1); // 将字符串转换为数字
    }

    if (v2 == null) {
        v2 = Number.MIN_VALUE;
    } else if (isNaN(v2)) {
        v2 = Number.MIN_VALUE; // 如果不是数字，视为最小值
    } else {
        v2 = Number(v2); // 将字符串转换为数字
    }

    // 使用比较运算符比较数字大小
    if (v1 < v2) {
        return -1;
    } else if (v1 > v2) {
        return 1;
    } else {
        return 0; // 相等
    }
}

export const date = (v1: string, v2: string) => {

}

export const datetime = (v1: string, v2: string) => {

}

export const time = (v1: string, v2: string) => {

}
