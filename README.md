Za populaciju redis baze izvristi komandu

cat data.txt | ./redis-cli --pipe

Za brisanje svih podatka iz redis baze pokrenuti redis-cli i izvristi komandu FLUSHALL

src/redis-cli
127.0.0.1>FLUSHALL

za rad aplikacije potrebno je pokrenuti redis na lokalhostu port 6379

za startovanje web aplikacije uci u server folder i pokrenuti komandu npm run install a posle npm run start

posle ove dve komande server je otvoren na adresi localhost:8080
