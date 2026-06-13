/** Возвращает псевдослучайное число на основе текущего времени
 *
 * @returns Псевдослучайное число
 */
export const getRandomNumber = (): number => Math.floor(Date.now() * Math.random());
