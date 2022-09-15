generate release

1. check that manifest.json and package.json have correct version tags
    - manifest.json has 2 version tags
2. edit gen_release.py's version option to match
3. activate your node and python env (any python 3.8+)
4. run the script. output will be zip file in output folder
5. commit and tag the repo