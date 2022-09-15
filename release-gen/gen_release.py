# node environment should be activated before using this script (and of course python env)

from os.path import join,dirname,realpath
from os import removedirs,makedirs,chdir,system
from shutil import rmtree,copy,copytree

from typing import List

# confirguration
version:str="1.0.0-beta"
skipBuild:bool=False

if __name__=="__main__":
    HERE:str=dirname(realpath(__file__))

    # name of the extension with version
    extensionName:str=f"bookmark-randomiser_{version}"

    # the top level output dir
    outputDir:str=join(HERE,"output")

    # the actual release files
    releaseDir:str=join(outputDir,extensionName)

    # clear and recreate the output dir and release dir
    print("clearing/recreating output dir")
    rmtree(outputDir,ignore_errors=True)
    makedirs(outputDir)
    makedirs(releaseDir)

    # go to repo top level and build it
    print("building")
    chdir(join(HERE,".."))
    if not skipBuild:
        system("npm run build")

    # copy in target files
    print("copying files")
    copy("manifest.json",releaseDir)
    copytree("build",join(releaseDir,"build"))

    # enter output dir and zip the items
    print("zipping")
    chdir(outputDir)
    system(f"zip -r {extensionName}.zip {extensionName}")

    print("done")