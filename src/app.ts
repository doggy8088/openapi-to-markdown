var fs = require('fs');

var spec = JSON.parse(fs.readFileSync('../swagger.json', 'utf-8'));

Object.keys(spec.paths).forEach((path, pathIndex) => {
    Object.keys(spec.paths[path]).forEach((method, methodIndex) => {
        let api = spec.paths[path][method];
        appendLine(`## ${method.toUpperCase()} ${path}`);
        appendLine();
        appendLine('說明：' + api.summary);
        appendLine();

        if (api.parameters) {
            appendLine('參數：');
            appendLine();
            appendLine(`| 參數名稱 | 參數型別 |`);
            appendLine(`| -------- | -------- |`);
            api.parameters.forEach(param => {
                appendLine(`| ${param.name} | ${param.schema.type} |`);
            });
            appendLine();
        }

        if (api.responses) {
            appendLine('回應：');
            appendLine();
            appendLine(`| 狀態碼   | 回應說明 |`);
            appendLine(`| -------- | -------- |`);
            Object.keys(api.responses).forEach(status => {
                let response = api.responses[status];
                appendLine(`| ${status} | ${response.description} |`);
            });
            appendLine();
        }
    });
});


function appendLine(line = '')
{
    console.log(line);
}
