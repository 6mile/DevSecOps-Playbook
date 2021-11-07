# The DevSecOps Checklist
The intent of this project is to create an actionable list of things that any org, of any size, can do to implement a *functioning* DevSecOps program.
This checklist is broken down into three areas of concern: The developers laptop, the centralized source code management platform, the CI/CD process and finally, the public cloud where you deploy your application.

## The developers laptop
The developers laptop is where most of the magic happens, but also where most of the problems are introduced.  If you want to shift as far left as you can this is where you want to land much of your embedded security.

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

### use jq to sort by two columns and use the csv format
```jq -r '.secrets[] | [.file, .offender] | @csv' ./scanresults/file01.json | sort -u```

### use jq to pull all relevant fields for CSV report
```jq -r '.secrets[] | [.file, .rule, .lineNumber, .commit, .author, .date, .offender] | @csv' ./file02.json > file02-report.csv```

### use jq to remove the line file from bloodhound-cli
```jq 'del(.secrets[].line)' ./file03.json```

### use git to search all commits 
```git grep "password=" `git show-ref --heads` ```

### count number of commits in history
```git rev-list HEAD --count```
