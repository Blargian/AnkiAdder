import sys, json

def read_in():
    input = sys.stdin.readlines()
    return json.loads(input[0])

def main():

    data = read_in()
    print(data['pronounciationURL'])

if __name__ == '__main__':
    main()

