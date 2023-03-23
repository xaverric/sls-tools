# dependency-manager

Command allowing user to run dependency analysis or dependency lock over the uuApp project. Command can checkout the
project right from the git repository based on the provided information in the configuration or it can load the
dependency list from individual file. Dependency analysis can be visualized into the CSV file or into the bookkit page.

## Usage

```shell
sls-tools dependency-manager <parameters>
```

## Parameters

### -a, --analyze

Dependency analysis - provides a full table of used libraries and dependencies and its versions. Analysis export can be
visualized using ``--visualize`` parameter to CSV or Bookkit page.

### -l, --lock

Lock dependency feature scans all dependencies in package-lock.json file and locks the versions defined in the
package.json. In case there are more versions of the given library defined in package-lock.json, the value replaced in
package.json will include all the versions. It is on the reviewer to decide on the correct version.

**Example**

```json
{
  "dependencies": {
    "cors": "2.8.5 | 2.8.4",
    "lru-cache": "6.0.0 | 4.1.5 | 5.1.1 | 4.1.2 | 2.2.4 | 4.1.3",
    "node-cache": "4.2.1"
  }
}
```

### -m, --mode

Define what mode should be used for dependency analysis or dependency lock. With ``file`` mode, it is required to
provide path to the single package.json and package-lock.json files. With ``git`` mode, the tool will checkout the git
repository for each uuApp and load the files from there.

#### Supported types of modes

* ``git`` - Load data for dependency analysis or dependency lock from the project path defined in the uuApp
  configuration
* ``file`` - Load data for dependency analysis or dependency lock right from the file provided via ```--path```
  parameter

### -p, --path

Path to the directory with package.json and package-lock.json located inside. Applicable for both ``--analyze``
and ``--lock`` attribute.

### --packageJsonPath

Path to the package.json file. Applicable for both ``--analyze`` and ``--lock`` attribute. This option will get handy
when using the sls-tools as a project dependency.

### --packageLockJsonPath

Path to the package-lock.json file. Applicable for both ``--analyze`` and ``--lock`` attribute. This option will get
handy when using the sls-tools as a project dependency.

### -v, --visualize

Visualization type to be used. Bookkit visualization supported for ```git``` mode only, ```csv``` is supported for file
and git mode. CSVs are stored into the temp directory based on the configuration. Visualization is supported
for ```analyze``` attribute only

#### Supported types of visualization

* ``csv`` - visualize result into the CSV document
* ``bookkit`` - visualize result into the Bookkit page

## Configuration

This configuration snippet below describes only the changes to the base configuration
documented [here](../../../readme.md).

```js
module.exports = {
    uuApp: {
        subAppList: [
            {
                name: "subAppName", // name of the subApp, used only in this tool as an identification value
                gitName: "gitName", // name of the git repository for the given uuApp
                projectPaths: [
                    "projectFolderName" // folder name inside the project, where the main project file is located, in case of multiple root folders, the tool will handle analysis or lock for all project paths 
                ],
                dependencyVisualization: { // configuration for visualization of the analysis result into the bookkit, the prerequisity is to run analysis with git mode and bookkit visualization
                    "projectFolderName": { // same name as in projectPaths has to be defined
                        page: "...", // bookkit page code
                        code: "..." // bookkit page section code
                    }
                }
            }
        ]
    }
}
```

## Usage

dependency-manager can be used outside the project with proper configuration definition or it can be used as a project
dependency

### dependency-manager as a project dependency

#### Installation

Install as a project dependency

```npm install sls-tools --save-dev```

#### Add analyze npm script task

```json
{
  "devDependencies": {
    "sls-tools": "^1.5.0"
  },
  "scripts": {
    "sls-tools-dependency-analyze-csv": "sls-tools dependency-manager --noconfig --analyze --mode file --packageLockJsonPath ./ --noprompt --visualize csv"
  }
}
```

#### Add lock npm script task

```json
{
  "devDependencies": {
    "sls-tools": "^1.5.0"
  },
  "scripts": {
    "sls-tools-dependency-lock": "sls-tools dependency-manager --noconfig --lock --mode file --packageLockJsonPath ./ --packageJsonPath ./ --noprompt"
  }
}
```