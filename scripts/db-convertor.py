import json
import csv

with open('./data/full-finland-rest.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

dbColumnNameDict = {
  "Nimi": "name",
  "Maakunta": "living_province",
  "Yhteensä": "earnings_total",
  "Ansiotulo": "earned_income",
  "Pääomatulo": "capital_income",
  "Vero%": "tax_rate",
  "Tulo veron jälkeen": "income_after_tax",
  "Jäännösvero": "remaining_tax",
  "Palautukset": "refunds",
  "Syntymävuosi": "birth_year",
  "Sija": "rank",
  "Maakunnan sija": "province_rank",
}

csv_file = "output-rest.csv"

with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)

    # Записываем заголовки (новые ключи из dbColumnNameDict)
    writer.writerow(dbColumnNameDict.values())

    # Проходим по массиву объектов
    for obj in data:
        # Заменяем ключи на новые
        row = {dbColumnNameDict[key]: value for key, value in obj.items() if key in dbColumnNameDict}
        # Записываем строку в CSV
        writer.writerow(row.values())

print(f"CSV файл '{csv_file}' успешно создан!")