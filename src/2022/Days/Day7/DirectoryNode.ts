export class DirectoryNode {
    name = "";
    children: DirectoryNode[] = [];
    parent!: DirectoryNode;
    size: number = 0;
    isDir = false;

    constructor(name:string) {
        this.name = name;
    }

    addChild(name: string, size: number, parent: DirectoryNode) {
        let child = new DirectoryNode(name);

        child.size = isNaN(size)?0:size;
        child.isDir = isNaN(size)?true:false;
        child.parent = parent;

        this.children.push(child)
    }

    containsFilesOnly(){
        let ans = true;
        this.children.forEach(child => {
            if(child.isDir) {
                ans = false;
            }
        })
        return ans;
    }




}