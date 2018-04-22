FILES=*.rst
for f in $FILES
do
	  # extension="${f##*.}"
	    filename="${f%.*}"
	      echo "Converting $f to $filename.md"
	        `pandoc -s -o $filename.md $f`
		  # uncomment this line to delete the source file.
		    # rm $f
	    done
