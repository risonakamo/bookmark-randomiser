import _ from "lodash";

/** pull a number of items from an array. return the items, and the source array with the
 *  items removed */
export function randomPull<T>(source:T[],amount:number):RandomGenResult<T>
{
    var sourceCopy:T[]=_.cloneDeep(source);
    sourceCopy=_.shuffle(sourceCopy);

    const pullresult:T[]=[];

    for (var i=0;i<amount;i++)
    {
        const pull:T|undefined=sourceCopy.pop();

        if (!pull)
        {
            break;
        }

        pullresult.push(pull);
    }

    return {
        modifiedSource:sourceCopy,
        pullResult:pullresult
    };
}