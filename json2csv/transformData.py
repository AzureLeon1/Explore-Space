fc = open("school.json", "r")
fw = open("school.csv", "w")

# str = fc.readline()
cnt = 0
for line in fc:
    if line == "]":
        break

    cnt += 1
    if cnt == 1:
        line = line[1:]
    else:
        line = line[2:]

    if line[len(line) - 2] == ",":
        line = line[:-2] + '\n'

    print(line)
    fw.write(line)

    # print(line[len(line)-2])

