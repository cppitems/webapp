

export function render(rawcode: string): string {
    const skiplines = rawcode.split('\n').filter(function (line: string): boolean {
        if (line.match(/\/\/\/\s*$/)) {
            return false;
        }
        return true;
    }).join('\n');

    const replSE = skiplines.
        replace(/</gm, '&lt;');

    const skipbeforeTriple = replSE.
        // insert dots: "  xxxx /// YYY" -> "  YYY"
        replace(/^(\s*)(.*\/\/\/\s)(.*)$/gm, '$1$3');

    let tmp = skipbeforeTriple;
    for (let j = 0; j < 10; j++) {
        const num = j.toString();
        const regex2 = new RegExp('\\/\\*b([' + num + '])\\*\\/\\s(.{' + num + '})', 'gm');
        tmp = tmp.replace(regex2, '<span class="pmans-b">$2</span>');
    }
    for (let j = 0; j < 10; j++) {
        const num = j.toString();
        const regex2 = new RegExp('\\/\\*f([' + num + '])\\*\\/\\s(.{' + num + '})', 'gm');
        tmp = tmp.replace(regex2, '<span class="pmans-f">$2</span>');
    }

    const colors = tmp.
        replace(/\/\*b\*\/\s(.*?)\s\/\*x\*\//gm, '<span class="pmans-b">$1</span>').
        replace(/\/\*f\*\/\s(.*?)\s\/\*x\*\//gm, '<span class="pmans-f">$1</span>');

    const filename = colors.
        replace(/\/\*\sfile:\s(.[^\/*\*\/]*)\s\*\//gm, '<span class="pmans-filename">$1</span>');

    const compileCommand = filename.
        replace(/\/\*\scompile:\s(.[^\/*\*\/]*)\s\*\//gm, '<span class="pmans-compile">$1</span>');

    const colorComments = compileCommand.
        replace(/\/\/(.*)$/gm, '<span class="pmans-comment">//$1</span>');

    return colorComments;
}
