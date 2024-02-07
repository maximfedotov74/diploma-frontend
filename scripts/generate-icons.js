const fs = require('node:fs');
const path = require('path');
const icons = {};
//fill="\S+"

function genNames() {
	fs.readdir(path.join(process.cwd(), 'assets', 'icons'), (err, files) => {
		for (file of files) {
			const name = path.parse(file).name;
			icons[name] = name;
		}
		fs.writeFileSync(
			'icons.d.ts',
			`type Icons = 
			${JSON.stringify(icons)}
			type IconType = keyof Icons;
		`
		);
	});
}

genNames();
