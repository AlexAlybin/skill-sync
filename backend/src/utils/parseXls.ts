import xlsx from 'xlsx';

export const parseXLSFileToSkills = (filepath: string) => {
    const workbook = xlsx.readFile(filepath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(sheet, {
        defval: '',
        raw: true,
        range: 0
    });

    return json.map((row: any) => ({
        name: row.Name || row.name,
        level: Number(row.Level || row.level),
    }));
};
