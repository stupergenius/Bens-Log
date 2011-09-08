C++ Pointers and Incomplete Types
#################################
:date: 2008-02-24 20:57
:category: Development
:tags: C++

Learned some new things about C++ and pointers today. Namely that you
can declare a pointer member variable of the class A in class A. Pretty
neat. Take for example the following simple illustration.

::

    #include <iostream>
    class A {
        public:
            void setMember(A& m) { this->member = &m; }
            A* member;
            int x;
    };

    int main(int argc, char** argv) {
        A a,b;
        a.x = 2;
        b.x = 3;
        a.setMember(b);
        b.setMember(a);

        std::cout << "a.member->x = " << a.member->x << "n";
        std::cout << "b.member->x = " << b.member->x << "n";
    }

It's output is as follows:

::

    a.member->x = '3'
    b.member->x = '2'

So instead of doing this same thing in other more complicated ways we
can do it in one class with simple pointers. Also note that we don't
need to destruct the member variable since it will be destructed
automagically. I find this technique useful in cases where it makes
sense for classes to be linked together. In my case the different layers
of a neural network.
