'''
	This program organize files in your current directory by moving them to their designated folder

'''
import os 
import shutil



def split_names_and_extension(files):
	files_info = []
	for file in files:
		files_info.append(os.path.splitext(file))
	return files_info

def move_files(files):
	created_folders = {}
	for filesName, extension in files:

		if os.path.isfile(filesName+extension):
			
			if extension[1:] in created_folders.keys():
				created_folders[extension[1:]].append(filesName+extension)
				shutil.move(('./'+filesName+extension), ('./'+extension[1:]))

			else:
				created_folders[extension[1:]] = []
				created_folders[extension[1:]].append(filesName+extension)

				os.makedirs(extension[1:])
				shutil.move(('./'+filesName+extension), ('./'+extension[1:]))

def organize():
	path = os.getcwd()
	files = os.listdir(path)
	move_files(split_names_and_extension(files))

if __name__ == '__main__':
	print('ORGANIZING FILES..')
	organize()
	print('FINISHED')