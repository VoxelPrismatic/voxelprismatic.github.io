import os
import datetime
year = datetime.datetime.now().year
print(year - 1, "-->", year)

yr_0 = "© PRIZ ;], " + str(year - 1)
yr_1 = "© PRIZ ;], " + str(year)

for dr, dn, fn in os.walk("../.."):
    for f in fn:
        if f.endswith(".html"):
            print(dr + "/" + f)
            st0 = open(dr + "/" + f).read()
            st1 = st0.replace(yr_0, yr_1)
            if st0 != st1:
                print(f)
            open(dr + "/" + f, "w").write(st1)
