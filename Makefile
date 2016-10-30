d:
	echo 'pass' | tr -d '\n' | pbcopy
	rsync -arv build/ hoge@hoge.jp/fuga --exclude='*.DS_Store'

b:
	cp -r ./build ./.tmp
	rm -rf build/ diff/ diff.txt
	gulp build
	gulp build -t sp
	find ./build -name "*.map" | xargs rm
	gulp minify
	pngquant --verbose --speed 1 --ext .png build/**/*.png --force
	jpegoptim --strip-all --max=90 build/**/*.jpg
	cp app/.htaccess build/
	rm -rf **/.DS_Store
	diff -qr ./build/ ./.tmp/ > diff.txt; [ $$? -eq 1 ] || exit 0
	sed -i '' -e 's/Only in .\/build/+add    .\/build/' ./diff.txt
	sed -i '' -e 's/Only in .\/.tmp/-remove .\/build/' ./diff.txt
	sed -i '' -e 's/Files/Update /' ./diff.txt
	sed -i '' -e 's/: /\//' ./diff.txt
	sed -i '' -e 's/and.*//' ./diff.txt
	mkdir -p diff_files/build || exit 0
	sh diff.sh
	rsync -ar diff_files/build/ diff/ || exit 0
	rm -rf diff_files/ .tmp/
	#################################
	####### build complete!!! #######
	#################################

p:
	gulp

s:
	gulp -t sp

