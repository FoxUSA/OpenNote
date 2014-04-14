rem Created by Jake Liscom
rem Version 13.12.0

SET php="C:\Users\jake\Desktop\Programs\xampp\xampp-win32-1.8.1-VC9\xampp\php\php.exe"
SET phpunit="C:\Users\jake\Desktop\Programing\Web\working\OpenNote.Test\phpunit.phar"

SET runTest=%php% %phpunit%

%runTest% --coverage-html ./report

pause