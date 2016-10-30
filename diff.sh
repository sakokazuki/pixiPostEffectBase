cat ./diff.txt | while read line
do
  IFS=' '
  set -- $line
  if [ `echo "$1" | grep "+add"` ] ; then
    echo "\033[0;31m$line\033[0;39m"
    rsync -R "$2" diff_files/
  fi

  if [ `echo "$1" | grep "\-remove"` ] ; then
    echo "\033[0;35m$line\033[0;39m"
  fi

  if [ `echo "$1" | grep "Update"` ] ; then
    echo "\033[0;34m$line\033[0;39m"
    rsync -R "$2" diff_files/
  fi
done
