Za populaciju redis baze izvristi komandu

cat data.txt | ./redis-cli --pipe

Za brisanje svih podatka iz redis baze pokrenuti redis-cli i izvristi komandu FLUSHALL

src/redis-cli
127.0.0.1>FLUSHALL
