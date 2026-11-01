#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Автоматический скрипт для смены домена и подключения Google Analytics 4 во всех файлах сайта!
Использование в терминале (на компьютере):
    python3 update-domain.py fomichovapps.com G-1234567890
"""
import os
import sys

OLD_BASE = "https://fomichov-android.github.io/fomichovapps"

def main():
    if len(sys.argv) < 2:
        print("Использование: python3 update-domain.py <ваш-домен.com> [G-XXXXXXXXXX]")
        sys.exit(1)

    raw_domain = sys.argv[1].strip().rstrip("/")
    if not raw_domain.startswith("http"):
        new_base = "https://" + raw_domain
        clean_host = raw_domain
    else:
        new_base = raw_domain
        clean_host = raw_domain.replace("https://", "").replace("http://", "").split("/")[0]

    ga_id = sys.argv[2].strip() if len(sys.argv) >= 3 else ""

    # 1. Записываем файл CNAME для GitHub Pages
    with open("CNAME", "w", encoding="utf-8") as f:
        f.write(clean_host + "\n")
    print(f"[✓] Создан файл CNAME для GitHub Pages: {clean_host}")

    # 2. Обновляем URL во всех HTML, XML, TXT, JS файлах
    exts = (".html", ".xml", ".txt", ".js", ".webmanifest")
    updated_count = 0
    for root, _, files in os.walk("."):
        for file in files:
            if file.endswith(exts):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                new_content = content.replace(OLD_BASE, new_base)
                if ga_id and file == "site-core.js":
                    new_content = new_content.replace('ga4MeasurementId: ""', f'ga4MeasurementId: "{ga_id}"')
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    updated_count += 1

    print(f"[✓] Обновлено файлов с новым доменом ({new_base}): {updated_count}")
    if ga_id:
        print(f"[✓] Подключен счетчик Google Analytics 4: {ga_id}")

if __name__ == "__main__":
    main()
