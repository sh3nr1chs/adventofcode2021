export class DirectionReader {
   getDir(direction: string): string {
    return direction.split(" ")[0];
   }

   getDistance(direction: string): number {
    return parseInt(direction.split(" ")[1]);
   }
}